export const protect = async (req, res, next) => {
  try {
    // Get authenticated user ID (Clerk)
    const { userId } = await req.auth();

    if (!userId) {
      return res.json({
        success: false,
        message: "Not authenticated",
      });
    }

    // If authenticated → continue to next middleware
    next();

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
