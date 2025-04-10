const BASE_URL = "https://remotive.com/api/remote-jobs";

export const fetchJobs = async (params = {}) => {
  const url = new URL(BASE_URL);
  
  const queryParams = {
    limit: 20,
    ...params
  };

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error("Invalid jobs data structure");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`Categories request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error("Invalid categories data structure");
    }

    return data.jobs.map((category) => category.name);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};

// Enhanced job fetching by ID
export const fetchJobById = async (jobId) => {
  if (!jobId) throw new Error("Job ID is required");

  try {
    // First try to fetch all jobs and filter
    const { jobs } = await fetchJobs({ limit: 100 });
    const job = jobs.find(j => j.id === jobId);
    
    if (job) return job;
    
    // If not found in first 100, try a more precise search
    const response = await fetch(`${BASE_URL}?id=${jobId}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Job with ID ${jobId} not found`);
      } else {
        throw new Error(`Failed to fetch job with ID ${jobId}: ${response.status}`);
      }
    }
    
    const data = await response.json();
    if (!data.jobs || !Array.isArray(data.jobs) || data.jobs.length !== 1) {
      throw new Error(`Invalid response data structure for job with ID ${jobId}`);
    }
    return data.jobs[0];
    
  } catch (error) {
    console.error("Failed to fetch job:", error);
    throw error;
  }
};