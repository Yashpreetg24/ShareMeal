const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getVolunteerProfile = async (req, res) => {
  try {
    const volunteer = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, phone: true, createdAt: true }
    });

    const [completedCount, avgRating] = await Promise.all([
      prisma.acceptance.count({
        where: { volunteerId: req.user.id, status: 'completed' }
      }),
      prisma.rating.aggregate({
        where: { volunteerId: req.user.id },
        _avg: { rating: true },
        _count: { _all: true }
      })
    ]);

    res.json({
      ...volunteer,
      completedPickups: completedCount,
      averageRating: avgRating._avg.rating || 0,
      ratingCount: avgRating._count._all,
      badges: completedCount >= 10 ? ['Reliable Helper'] : []
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getDashboard = async (req, res) => {
  try {
    const [activePickups, completedPickups, ratings] = await Promise.all([
      prisma.acceptance.count({
        where: { volunteerId: req.user.id, status: 'accepted' }
      }),
      prisma.acceptance.count({
        where: { volunteerId: req.user.id, status: 'completed' }
      }),
      prisma.rating.aggregate({
        where: { volunteerId: req.user.id },
        _avg: { rating: true },
        _count: { _all: true }
      })
    ]);

    res.json({
      activePickups,
      completedPickups,
      averageRating: ratings._avg.rating || 0,
      ratingCount: ratings._count._all
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getVolunteerProfile, getDashboard };