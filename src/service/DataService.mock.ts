import * as data from "../server/db.json";
import { Contact, IDataService } from "../common/types";

export const MockDataService: IDataService = {
  getJobs: () => Promise.resolve(data.jobs),
  getJobAllocations: () => Promise.resolve(data.jobAllocations),
  getActivities: () => Promise.resolve(data.activities),
  getActivityAllocations: () => Promise.resolve(data.activityAllocations),
  getResources: () => Promise.resolve(data.resources),
  getJobsWithSearchTerm: (searchTerm: string) =>
    Promise.resolve(
      data.jobs
        .filter((job) =>
          job.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((job) => {
          return { ...job, contact: findContact(job.contactId) };
        })
    ),
};

const findContact = (contactId: number): Contact =>
  data.contacts.find((contact) => contact.id === contactId) || {
    id: -1,
    name: "No contact",
  };
