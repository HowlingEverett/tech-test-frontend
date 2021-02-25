import {
  useState,
  useEffect,
  useCallback,
  FC,
  ChangeEventHandler,
} from "react";
import { IAppTabContainer, JobSearchResult } from "../common/types";
import { useDebounce } from "use-debounce";
import moment from "moment";

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
    if (debouncedQuery.length === 0) {
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
  }, [debouncedQuery, service]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  };

  return (
    <SectionGroup>
      <SectionPanel>
        <JobSearchInput value={query} handleSearch={handleSearch} />

        <LoadingIndicator isLoading={isLoading} />

        <JobSearchResults
          jobs={jobs}
          isLoading={isLoading}
          noResults={zeroResultQuery(debouncedQuery, jobs)}
        />
      </SectionPanel>
    </SectionGroup>
  );
};

const JobSearchInput: FC<{
  value: string;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, handleSearch }) => (
  <div className="job-search-input-container">
    <label htmlFor="job-search" className="job-search-input-label">
      Job search
    </label>
    <input
      id="job-search"
      type="search"
      autoComplete="off"
      className="job-search-input"
      placeholder="Search for a job, e.g. 'build a fence'"
      value={value}
      onChange={handleSearch}
    />
  </div>
);

/*
 * Mark: Display Components
 * */
const JobSearchResults: FC<{
  jobs?: JobSearchResult[];
  isLoading: boolean;
  noResults: boolean;
}> = ({ jobs, isLoading, noResults }) => (
  <>
    {jobs?.map((job, index) => (
      <div className="job-search-results" key={index}>
        <div className="job-search-results-primary">
          <div className="job-search-results-name">{job.name}</div>

          <div className="job-search-results-contact-assignment">
            <strong>Contact:</strong> {job.contact.name}
          </div>
        </div>

        <div className="job-search-results-dates">
          <div className="job-search-results-dates-start">
            <strong className="job-search-results-dates-label">
              Starts on
            </strong>
            {formatDate(job.start)}
          </div>
          <div className="job-search-results-dates-end">
            <strong className="job-search-results-dates-label">Ends on</strong>
            {formatDate(job.end)}
          </div>
        </div>
      </div>
    ))}

    {noResults && !isLoading && (
      <div className="job-search-results job-search-results-no-results">
        No results
      </div>
    )}
  </>
);

const LoadingIndicator: FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  return isLoading ? (
    <div className="job-search-results">
      <div className="job-search-loading-indicator">Loading...</div>
    </div>
  ) : null;
};

/*
 * Mark: Utility functions
 */
const zeroResultQuery = (
  query: string,
  results: JobSearchResult[] = []
): boolean => results?.length === 0 && query.length > 0;

const formatDate = (isoDate: string): string => {
  return moment(isoDate).format("dddd, Do MMMM YYYY, h:mm a");
};
