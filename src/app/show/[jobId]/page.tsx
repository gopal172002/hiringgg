import { JobModel } from "@/models/Job";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    jobId: string;
  };
};

export default async function SingleJobPage(props: PageProps) {
  const { jobId } = props.params;

  // Ensure the database connection
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }

  // Fetch job data from the backend
  const jobDoc = await JobModel.findById(jobId).lean();

  if (!jobDoc) {
    return notFound();
  }

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-8">
      <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
        <div className="sm:flex items-start">
          {/* Job Details */}
          <div className="grow">
            <h1 className="text-3xl font-bold text-gray-900 mb-3 dark:text-gray-200">
              {jobDoc.title}
            </h1>
            <div className="capitalize text-sm text-blue-700 mb-4 flex flex-wrap gap-2">
              <span className="bg-blue-100 px-3 py-1 rounded-lg font-medium">
                {jobDoc.remote}
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-lg font-medium">
                {jobDoc.type}-time
              </span>
              {jobDoc.expectedSalary && (
                <span className="bg-yellow-100 px-3 py-1 rounded-lg font-medium">
                  {jobDoc.expectedSalary} LPA
                </span>
              )}
              {(jobDoc.experience !== undefined ||
                jobDoc.experience != null) && (
                <span className="bg-purple-100 px-3 py-1 rounded-lg font-medium">
                  {jobDoc.experience} Years Exp
                </span>
              )}
            </div>
          </div>

          {/* Job Icon */}
          <div className="ml-0 sm:ml-6 mt-6 sm:mt-0">
            {jobDoc.jobIcon && (
              <Image
                src={jobDoc.jobIcon}
                alt="Job icon"
                width={120}
                height={120}
                className="w-24 h-24 object-contain rounded-md"
              />
            )}
          </div>
        </div>

        {/* Job Description */}
        <div className="mt-6 whitespace-pre-line text-sm text-gray-700 leading-relaxed dark:text-gray-200">
          {jobDoc.description}
        </div>

        {/* Apply Section */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg dark:bg-gray-600">
          <h3 className="font-semibold text-lg text-gray-800 mb-3 dark:text-gray-200">
            Apply Here
          </h3>
          {jobDoc.jobUrl && (
            <a
              href={jobDoc.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-blue-500 hover:underline break-all dark:text-blue-400"
            >
              {jobDoc.jobUrl}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
