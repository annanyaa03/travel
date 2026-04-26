import supabase from '../config/supabase.js';

/**
 * Get all destinations with filtering and pagination
 */
export const getAllDestinations = async (req, res) => {
  console.log('--- getAllDestinations started ---');
  try {
    const limit = parseInt(req.query.limit) || 100;
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category;
    const offset = (page - 1) * limit;

    console.log(`Params: limit=${limit}, page=${page}, category=${category}`);

    let query = supabase
      .from('destinations')
      .select('*', { count: 'exact' });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Error fetching destinations from database',
        error: error.message
      });
    }

    console.log(`Fetched ${data.length} destinations. Total count: ${count}`);

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      message: "Destinations fetched successfully",
      data: data,
      meta: {
        total: count,
        page: page,
        limit: limit,
        totalPages: totalPages
      }
    });

  } catch (error) {
    console.error('Catch Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};

/**
 * Get destination by ID
 */
export const getDestinationById = async (req, res) => {
  console.log(`--- getDestinationById started for ID: ${req.params.id} ---`);
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      console.error('Supabase Error:', error.message);
      return res.status(error.code === 'PGRST116' ? 404 : 500).json({
        success: false,
        message: error.code === 'PGRST116' ? 'Destination not found' : 'Error fetching destination',
        error: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Destination fetched successfully",
      data: data
    });

  } catch (error) {
    console.error('Catch Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
