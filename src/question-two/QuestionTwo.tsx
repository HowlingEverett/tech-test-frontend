import { FC, useEffect, useState } from "react";
import {
  Activity,
  Resource,
  Job,
  JobAllocations,
  ActivityAllocations,
  IAppTabContainer,
} from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

interface ResourceScheduleAllocation {
  allocId: number;
  allocType: "job" | "activity";
  name: string;
  start: string;
  end: string;
}

interface ResourceSchedule {
  resourceName: string;
  resourceId: number;
  allocations: ResourceScheduleAllocation[];
}

export const QuestionTwo: FC<IAppTabContainer> = ({ service }) => {
  const [resourceSchedules, setResourceSchedules] = useState<
    ResourceSchedule[]
  >();
  const [error, setError] = useState<{ error: string }>();
  useEffect(() => {
    const fetchData = async () => {
      const [
        resources,
        jobs,
        activities,
        jobAllocations,
        activityAllocations,
      ] = await Promise.all([
        service.getResources(),
        service.getJobs(),
        service.getActivities(),
        service.getJobAllocations(),
        service.getActivityAllocations(),
      ]);

      return mergeToSchedule(
        resources,
        jobs,
        activities,
        jobAllocations,
        activityAllocations
      );
    };

    fetchData()
      .then((mergedSchedules) => setResourceSchedules(mergedSchedules))
      .catch((error) => {
        setError({ error: error });
      });
  }, [service]);

  return (
    <SectionGroup>
      <SectionPanel>
        {error !== undefined
          ? JSON.stringify(error)
          : JSON.stringify(resourceSchedules)}
      </SectionPanel>
    </SectionGroup>
  );
};

const mergeToSchedule = (
  resources: Resource[],
  jobs: Job[],
  activities: Activity[],
  jobAllocations: JobAllocations[],
  activityAllocations: ActivityAllocations[]
): ResourceSchedule[] => {
  const resourceIds = resources.map((resource) => resource.id);
  const allocations = [...activityAllocations, ...jobAllocations]
    .filter((allocation) => resourceIds.includes(allocation.resourceId))
    .map(scheduleAllocations.bind(null, activities, jobs))
    .filter((allocation) => allocation.name.length > 0);

  return resources.map((resource) => {
    return {
      resourceName: resource.name,
      resourceId: resource.id,
      allocations,
    };
  });
};

const scheduleAllocations = (
  activities: Activity[],
  jobs: Job[],
  allocation: JobAllocations | ActivityAllocations
): ResourceScheduleAllocation => {
  const isJob = "jobId" in allocation;
  const entity: Job | Activity | undefined = isJob
    ? jobs.find((job) => job.id === (allocation as JobAllocations).jobId)
    : activities.find(
        (activity) =>
          activity.id === (allocation as ActivityAllocations).activityId
      );
  return {
    allocId: allocation.id,
    allocType: "jobId" in allocation ? "job" : "activity",
    name: entity?.name || "",
    start: entity?.start || "",
    end: entity?.end || "",
  };
};
