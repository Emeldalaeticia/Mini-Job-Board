import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchJobById } from "@/components/services/api";

const JobDetailsModal = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId) {
      const fetchJobDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const job = await fetchJobById(jobId);
          setJobDetails(job);
        } catch (err) {
          setError(err.message || "Failed to load job details");
          console.error("Error fetching job:", err);
        } finally {
          setLoading(false);
        }
      };
      
      fetchJobDetails();
    }
  }, [jobId]);

  // Function to safely render HTML content
  const renderHTML = (htmlString) => {
    if (!htmlString) return null;
    
    // Basic sanitization (in production, use a proper sanitizer like DOMPurify)
    const cleaned = htmlString
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/g, '');
    
    return { __html: cleaned };
  };

  // Extract requirements section more robustly
  const extractRequirements = (description) => {
    if (!description) return [];
    
    // Try to find explicit requirements section
    const requirementsMatch = description.match(
      /<p>.*?<span[^>]*>Requirements<\/span>.*?:<\/span><\/p>([\s\S]+?)(?=<p>|$)/i
    );
    
    if (requirementsMatch && requirementsMatch[1]) {
      return requirementsMatch[1]
        .split('</li>')
        .map(item => item.replace(/<[^>]+>/g, '').trim())
        .filter(item => item.length > 0);
    }
    
    // Fallback to looking for any list items
    const listItems = description.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
    if (listItems) {
      return listItems.map(item => 
        item.replace(/<[^>]+>/g, '').trim()
      ).filter(item => item.length > 0);
    }
    
    return [];
  };

  const requirements = jobDetails ? 
    extractRequirements(jobDetails.description) : 
    [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Job Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : jobDetails ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">{jobDetails.title}</DialogTitle>
              <div className="space-y-1">
                <p className="font-medium">{jobDetails.company_name}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{jobDetails.job_type}</span>
                  <span>{jobDetails.location}</span>
                  <span>{jobDetails.category}</span>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <section>
                <h3 className="font-semibold text-lg mb-2">Full Job Description</h3>
                <div 
                  className="text-gray-700 prose" 
                  dangerouslySetInnerHTML={renderHTML(jobDetails.description)}
                />
              </section>

              {requirements.length > 0 && (
                <section>
                  <h3 className="font-semibold text-lg mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="flex justify-end">
              <Button className="w-full sm:w-auto">Apply Now</Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default JobDetailsModal;