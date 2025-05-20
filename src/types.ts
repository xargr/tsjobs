

export type Job = {
    company_name: string
    company_url: string
    company_job_listing_url: string
    location: string
    remote: string // e.g., "Remote", "Hybrid", or "Onsite"
    title: string
    full_details: string
};

export type JobsApiResponse = {
    jobs: Job[]
    locations: string[]
}