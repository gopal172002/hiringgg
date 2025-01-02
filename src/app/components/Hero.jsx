"use client";

import { useState, useEffect, useCallback } from "react";
import { FaFilter, FaSyncAlt, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import JobRow from "@/app/components/JobRow";

export default function Hero() {
  const [jobType, setJobType] = useState({
    fullTime: false,
    internship: false,
  });
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all jobs on initial render
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/job/filter");
        const sortedJobs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Apply filters
  const applyFilters = useCallback(() => {
    setLoading(true);
    try {
      // Create filtered job list based on selected filters
      const selectedTypes = [];
      if (jobType.fullTime) selectedTypes.push("Full");
      if (jobType.internship) selectedTypes.push("Intern");

      const filtered = jobs.filter((job) => {
        const matchesType =
          selectedTypes.length === 0 || selectedTypes.includes(job.type);
        const matchesExperience =
          !experience ||
          job.experience >= parseInt(experience.split(" ")[2], 10);
        const matchesSalary =
          !salary ||
          (salary === "Competitive" && job.salary >= 10) ||
          (salary !== "Competitive" &&
            parseInt(job.expectedSalary, 10) >=
              parseInt(salary.split("-")[0], 10) &&
            (salary.includes("+") ||
              parseInt(job.expectedSalary, 10) <=
                parseInt(salary.split("-")[1], 10)));

        return matchesType && matchesExperience && matchesSalary;
      });

      setFilteredJobs(filtered);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  }, [jobType, experience, salary, jobs]);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setJobType({ fullTime: false, internship: false });
    setExperience("");
    setSalary("");
    setShowFilters(false);
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleJobTypeChange = (type) => {
    setJobType((prevState) => ({ ...prevState, [type]: !prevState[type] }));
  };

  return (
    <section className="w-full my-8 px-4 lg:px-0">
      <div className="lg:hidden mb-4 text-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 px-4 rounded-md shadow-md transform hover:scale-105 transition-all duration-300"
        >
          <FaFilter /> {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-12 gap-8">
        <div
          className={`col-span-3 lg:block ${
            showFilters ? "block dark:bg-gray-900" : "hidden"
          } lg:static absolute bg-white z-10 lg:bg-transparent lg:z-auto w-full lg:w-auto p-4 rounded-md shadow-lg transform transition-all duration-300`}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-600">
            <FaFilter /> Filters
          </h2>

          {/* Job Type Filters */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
              Job Type
            </h3>
            <div className="flex flex-wrap gap-4 mt-2">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={jobType.fullTime}
                  onChange={() => handleJobTypeChange("fullTime")}
                  className="h-5 w-5 text-purple-500 transition-all duration-300"
                />
                Full Time
              </label>
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={jobType.internship}
                  onChange={() => handleJobTypeChange("internship")}
                  className="h-5 w-5 text-purple-500 transition-all duration-300 dark:text-gray-200"
                />
                Internship
              </label>
            </div>
          </div>

          {/* Experience Filters */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
              Experience
            </h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                "More than 0 years",
                "More than 1 year",
                "More than 2 years",
                "More than 3 years",
                "More than 4 years",
              ].map((exp) => (
                <label
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  key={exp}
                >
                  <input
                    type="radio"
                    name="experience"
                    checked={experience === exp}
                    onChange={() => setExperience(exp)}
                    className="h-5 w-5 text-purple-500 transition-all duration-300"
                  />
                  {exp}
                </label>
              ))}
            </div>
          </div>

          {/* Salary Filters */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">
              Salary
            </h3>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                "Competitive",
                "2-4 LPA",
                "4-6 LPA",
                "6-10 LPA",
                "10-20 LPA",
                "20-30 LPA",
                "30-40 LPA",
                "40+ LPA",
              ].map((sal) => (
                <label
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                  key={sal}
                >
                  <input
                    type="radio"
                    name="salary"
                    checked={salary === sal}
                    onChange={() => setSalary(sal)}
                    className="h-5 w-5 text-purple-500 transition-all duration-300"
                  />
                  {sal}
                </label>
              ))}
            </div>
          </div>

          {/* Apply and Clear Filters */}
          <div className="mt-6 flex gap-4 justify-center">
            <button
              type="button"
              onClick={applyFilters}
              className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <FaCheckCircle /> Apply Filters
            </button>
            <button
              type="button"
              onClick={clearAllFilters}
              className="flex items-center gap-2 bg-gray-400 text-white py-2 px-4 rounded-md shadow-md transform hover:scale-105 transition-all duration-300"
            >
              <FaSyncAlt /> Clear All
            </button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="col-span-9">
          <h2 className="text-2xl font-bold mb-4 dark:text-gray-300">
            Job Openings
          </h2>
          {loading ? (
            <p className="text-gray-600 ">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobRow key={job._id} jobDoc={job} />)
          ) : (
            <p className="text-gray-600">No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
