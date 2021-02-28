import { useState, useEffect, useCallback, FC } from "react";
import * as React from "react";
import { IAppTabContainer, JobSearchResult } from "../common/types";
import { useDebounce } from "use-debounce";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./QuestionOne.css";

export const QuestionOne: FC<IAppTabContainer> = ({ service }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState<JobSearchResult[]>();
  const [debouncedQuery] = useDebounce(query, 300);
  const fetchJobs = useCallback(async () => {
    // Clear job results if we've cleared the query
    if (debouncedQuery.length === 0 && jobs?.length) {
      return setJobs([]);
    }

    // Don't search unless at least three characters in the query
    if (debouncedQuery.length < 3) {
      return;
    }

    setIsLoading(true);
    const results = await service.getJobsWithSearchTerm(debouncedQuery);
    setIsLoading(false);
    setJobs(results);
  }, [debouncedQuery, jobs, service]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <label htmlFor="job-search">Search for jobs</label>
        <input
          id="job-search"
          type="search"
          autoComplete="off"
          className="job-search-input"
          value={query}
          onChange={handleSearch}
        />

        <div className="job-search-results">
          {isLoading && (
            <div className="job-search-loading-indicator">Loading...</div>
          )}
          {jobs?.map((job, index) => (
            <div className="job-search-result" key={index}>
              <p>{job.name}</p>
              <div className="job-search-result-dates">
                <span>{job.start}</span>
                <span>{job.end}</span>
              </div>
              <div className="job-search-result-contact-assignment">
                {job.contact.name}
              </div>
            </div>
          ))}

          {jobs?.length === 0 && debouncedQuery && (
            <div className="job-search-result">No results</div>
          )}
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
