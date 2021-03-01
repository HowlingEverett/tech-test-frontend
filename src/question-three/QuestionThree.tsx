import { FC, useEffect, useState } from "react";
import moment from "moment";

import { IAppTabContainer, Job } from "../common/types";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import "./theme.css";
import styles from "./QuestionThree.module.css";

export const QuestionThree: FC<IAppTabContainer> = ({ service }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  useEffect(() => {
    const fetchJobs = async () => {
      const results = await service.getJobs();
      setJobs(results);
    };
    fetchJobs();
  }, [service]);

  return (
    <SectionGroup>
      <SectionPanel>
        <div className={styles.wrapper}>
          <nav className={styles.secondaryNav}>
            <ol className={styles.navLinks}>
              <li className={styles.navLinkItem}>
                <a href="/home" className={styles.navLink}>
                  &nbsp;
                </a>
              </li>
              <li className={styles.navLinkItem}>
                <a href="/schedule" className={styles.navLink}>
                  &nbsp;
                </a>
              </li>
              <li className={styles.navLinkItem}>
                <a href="/resources" className={styles.navLink}>
                  &nbsp;
                </a>
              </li>
              <li className={styles.navLinkItem}>
                <a href="/feed" className={styles.navLink}>
                  &nbsp;
                </a>
              </li>
              <li className={styles.settingsLinkItem}>
                <a href="/settings" className={styles.settingsLink}>
                  &nbsp;
                </a>
              </li>
            </ol>
          </nav>
          <header className={styles.secondaryHeader}>
            <h2 className={styles.headerTitle}>Header</h2>
          </header>

          <div className={styles.primaryContent}>
            <ol className={styles.scrollingList}>
              {jobs.map((job, index) => {
                return (
                  <li className={styles.jobListItem} key={`${index}-a`}>
                    <div className={styles.jobHeader}>
                      <h4 className={styles.jobTitle}>{job.name}</h4>
                      <span className={styles.jobSubtitle}>{`(Job #${
                        index + 1
                      })`}</span>
                      <div className={styles.jobLocation}>{job.location}</div>
                    </div>

                    <div className={styles.jobDates}>
                      <div className={styles.jobDay}>
                        {formattedDay(job.start)}
                      </div>
                      <div className={styles.jobTimes}>
                        {formattedHours(job.start, job.end)}
                      </div>
                    </div>

                    {(index === 1 || index === 2) && (
                      <div className={styles.jobResourceAllocations}>1</div>
                    )}
                  </li>
                );
              })}
              {jobs.map((job, index) => {
                return (
                  <li className={styles.jobListItem} key={`${index}-b`}>
                    <div className={styles.jobHeader}>
                      <h4 className={styles.jobTitle}>{job.name}</h4>
                      <span className={styles.jobSubtitle}>{`(Job #${
                        index + 5
                      })`}</span>
                      <div className={styles.jobLocation}>{job.location}</div>
                    </div>

                    <div className={styles.jobDates}>
                      <div className={styles.jobDay}>
                        {formattedDay(job.start)}
                      </div>
                      <div className={styles.jobTimes}>
                        {formattedHours(job.start, job.end)}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className={styles.secondaryContent}>
            <div className={styles.scrollingList}>
              {[
                Array.from(new Array(6).keys()).map((index) => (
                  <div
                    className={styles.secondaryItem}
                    key={`secondary-${index}`}
                  />
                )),
              ]}
            </div>
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};

const formattedDay = (dateString: string): string => {
  return moment(dateString).format("ddd MMM DD YYYY");
};

const formattedHours = (start: string, end: string): string => {
  return `${moment(start).format("kk:mm")} - ${moment(end).format("kk:mm")}`;
};
