import { defineCommand, runMain } from "citty";
import axios from "axios";
import { Job, JobsApiResponse } from "./types";
import Enquirer from "enquirer";


const main = defineCommand({
  meta: {
    name: "tsjobs",
    version: "1.0.0",
    description: "Curated typescript jobs in your terminal",
  },
  run: async () => {
    try {
      const res = await axios.get('https://typescript.jobs/api/job')
      const data: JobsApiResponse = res.data

      const locations = data.locations;

      if (locations.length === 0) {
        console.log('No job locations found.')
        return
      }

      const answer = await Enquirer.prompt<{ location: string }>([
        {
          type: 'select',
          name: 'location',
          message: 'Choose a location',
          choices: locations,
        },
      ]);

      const selectedLocation = answer.location

      const locationRes = await axios.get(`https://typescript.jobs/api/job?location=${encodeURIComponent(selectedLocation)}`)
      const locationJobs: Job[] = locationRes.data.jobs

      if (locationJobs.length === 0) {
        console.log(`No jobs found for ${selectedLocation}.`)
        return
      }

      console.log(`\n🎯 Jobs in ${selectedLocation}:\n`)
      locationJobs.forEach((job, index) => {
        console.log(`${index + 1}. 📌 ${job.title} @ ${job.company_name}`)
        console.log(`   🌍 Location: ${selectedLocation} ${job.remote}`)
        console.log(`   🔗 Apply: ${job.company_job_listing_url}`)
        console.log(`   🔎 See more: ${job.full_details}\n`)
      });

    } catch (error: unknown) {
        let errorMessage = "❌ Failed to fetch job data";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error('❌ Failed to fetch job data:', errorMessage)
    }
  }
});

runMain(main);
