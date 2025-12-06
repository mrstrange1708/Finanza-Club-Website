import React, { useState, useEffect } from 'react';
import { FileText, ArrowRight, Calendar, Clock } from 'lucide-react';
import { getDocuments } from '../../api/documentsApi';

export default function Documents() {
  const [newsletters, setNewsletters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getDocuments();
        const data = response.data;

        // Filter documents based on type or properties
        // Assuming 'type' field exists, or inferring from properties
        const fetchedNewsletters = data.filter(doc => doc.type === 'newsletter' || doc.month);
        const fetchedNotes = data.filter(doc => doc.type === 'note' || doc.date);

        setNewsletters(fetchedNewsletters);
        setNotes(fetchedNotes);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Unable to load documents at this time.");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C0003D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-24 flex justify-center items-center bg-white text-center px-4">
        <div>
          <p className="text-xl text-gray-800 mb-2">Oops! Something went wrong.</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-24">

      {/* Hero Header - Minimalist */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          Knowledge <span className="text-[#C0003D]">Hub</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Access our latest newsletters, research papers, and event notes to stay ahead in the financial world.
        </p>
      </section>

      {/* Featured / Navigation - Clean Categories */}
      <section className="container mx-auto px-6 mb-24">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100 group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-red-50 rounded-lg text-[#C0003D]">
                <FileText size={24} />
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-[#C0003D] transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Newsletters</h2>
            <p className="text-gray-500 mb-4">
              Detailed reports and analysis on current financial trends.
            </p>
            <span className="text-sm font-semibold text-[#C0003D] group-hover:underline decoration-[#C0003D] underline-offset-4">
              Read Latest Issue
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100 group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <FileText size={24} />
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Event Notes</h2>
            <p className="text-gray-500 mb-4">
              Summaries and key takeaways from our exclusive sessions.
            </p>
            <span className="text-sm font-semibold text-blue-600 group-hover:underline decoration-blue-600 underline-offset-4">
              View Collection
            </span>
          </div>
        </div>
      </section>

      {/* Newsletters Section */}
      <section className="container mx-auto px-6 mb-24 max-w-6xl">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Latest Newsletters</h2>
          <button className="text-sm font-medium text-gray-500 hover:text-[#C0003D] transition-colors">View Archive</button>
        </div>

        {newsletters.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsletters.map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="mb-4">
                  <span className="text-xs font-bold text-[#C0003D] bg-red-50 px-2 py-1 rounded-md uppercase tracking-wide">
                    {item.month || 'Recent'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#C0003D] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6 flex-grow line-clamp-3">
                  {item.excerpt || item.desc}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                  <Clock size={14} />
                  <span>{item.readTime || '5 min read'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No newsletters available at the moment.</p>
        )}
      </section>

      {/* Notes Section */}
      <section className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Event Notes</h2>
          <button className="text-sm font-medium text-gray-500 hover:text-[#C0003D] transition-colors">View All Notes</button>
        </div>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {notes.map((note, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-xl p-6 mb-3 border border-transparent group-hover:border-gray-200 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {note.date || 'Recent'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {note.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {note.desc || note.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No event notes available at the moment.</p>
        )}
      </section>

    </div>
  );
}
