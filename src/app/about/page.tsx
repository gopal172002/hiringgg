const AboutPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
        About HiringNexus
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Welcome to <strong>HiringNexus</strong>, your trusted platform for
        connecting talent with opportunity. Whether you are starting your career
        or looking for your next challenge, we make job searching effortless and
        effective.
      </p>

      <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-2">
        Why Choose Us?
      </h2>
      <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-4">
        <li>Extensive job listings across diverse sectors.</li>
        <li>Intuitive platform design for a seamless experience.</li>
        <li>Customizable filters to tailor your job search.</li>
        <li>Resources to empower job seekers with tips and insights.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-2">
        Connect With Us
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        Join our growing community to stay updated with the latest opportunities:
      </p>
      <ul className="list-none text-lg text-blue-500 dark:text-blue-400 space-y-2">
        <li>
          <a
            href="https://chat.whatsapp.com/JJfEoGqP5nJEUetQZwOQKc"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Community
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/company/hiringnexus/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Page
          </a>
        </li>
        <li>
          <a
            href="https://t.me/hiringNexus_team"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram Channel
          </a>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-black dark:text-white mt-6 mb-2">
        Our Future
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        We are expanding our reach, improving features, and enhancing user
        satisfaction to become the leading job portal globally.
      </p>
    </div>
  );
};

export default AboutPage;
