import OAphotos from '@/app/components/OAphotos';

type OAQuestion = {
  id: string;
  question: string;
  options?: string[];
  photos?: string[];
  company?: string;
  description?: string;
};

type Question = {
  _id: string;
  company: string;
  description: string;
  photos: string[];
  createdAt: string;
  updatedAt: string;
};

export default async function TestPage() {
  try {
    const res = await fetch('/', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const oaQuestions: OAQuestion[] = await res.json();

    
    const questions: Question[] = oaQuestions.map((qa) => ({
      _id: qa.id, 
      company: qa.company || "Unknown Company", 
      description: qa.description || "No description available",
      photos: qa.photos || [], 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString(), 
    }));

    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">OA Questions</h1>
        <OAphotos questions={questions} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching OA questions:', error);
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">OA Questions</h1>
        <p className="text-center text-red-500">Error loading OA questions. Please try again later.</p>
      </div>
    );
  }
}
