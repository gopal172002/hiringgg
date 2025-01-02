"use client";
import { useState, useEffect } from "react";
import TimeAgo from "@/app/components/TimeAgo";
import { Job } from "@/models/Job";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobRow({ jobDoc }: { jobDoc: Job }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = () => {
      const storedIsAdmin = localStorage.getItem("isAdmin");
      setIsAdmin(storedIsAdmin === "true");
    };
    
    checkAdminStatus();
  }, []);

  const handleCardClick = () => {
    router.push(`/show/${jobDoc._id}`);
  };

  return (
    <div
      className="border-t border-gray-300 my-6 hover:scale-[1.02] transition-transform cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl hover:border-gray-300 transition-all duration-300 dark:bg-gray-800">
        <div className="flex flex-col">
          <div className="grow">
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-3">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-700 font-semibold">
                {jobDoc.remote}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-700 font-semibold ml-2">
                {jobDoc.type}-time
              </span>
              {jobDoc.expectedSalary && (
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 font-semibold ml-2">
                  {jobDoc.expectedSalary} LPA
                </span>
              )}
              {jobDoc.experience != null && (
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 font-semibold ml-2">
                  {jobDoc.experience} Yr Exp
                </span>
              )}
            </div>

            <div>
              <Link
                href={`/jobs/${jobDoc.orgId}`}
                className="text-gray-600 hover:text-blue-500 font-semibold dark:text-gray-300"
                onClick={(e) => e.stopPropagation()} // Prevents card click
              >
                {jobDoc.orgName || "."}
              </Link>
              <h3 className="font-bold text-xl text-gray-900 mt-2 mb-4 dark:text-gray-300">
                {jobDoc.title}
              </h3>
            </div>

            {isAdmin && (
              <div className="text-gray-400 text-sm mt-2 flex gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await axios.delete("/api/jobs?id=" + jobDoc._id);
                    window.location.reload();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center gap-4">
            {jobDoc.createdAt && (
              <div className="mt-2 sm:mt-0 text-sm text-gray-500">
                <TimeAgo createdAt={jobDoc.createdAt} />
              </div>
            )}

<div className="max-w-32 sm:max-w-none">
  <button
    className="px-4 py-2 rounded bg-green-600 text-white"
    onClick={(e) => {
      e.stopPropagation();
      const shareUrl = `https://wa.me/?text=${encodeURIComponent(
        `Check out this job opportunity: www.hiringnexus.in/show/${jobDoc._id}`
      )}`;
      window.open(shareUrl, "_blank");
    }}
  >
    <FaWhatsapp className="inline-block mr-2" />
    Share on Whatsapp
  </button>
</div>

          </div>
        </div>
      </div>
    </div>
  );
}
