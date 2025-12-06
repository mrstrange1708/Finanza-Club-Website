import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import { getMembers } from '../../api/membersApi';

export default function Members() {
    const [boardMembers, setBoardMembers] = useState([]);
    const [coreTeam, setCoreTeam] = useState([]);
    const [previousMembers, setPreviousMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getMembers();
                const data = response.data;
                console.log(data)
                const fetchedBoard = data.filter(m => m.category === 'board');
                const fetchedCore = data.filter(m => m.category === 'core');
                const fetchedPrevious = data.filter(m => m.category === 'alumni');

                setBoardMembers(fetchedBoard);
                setCoreTeam(fetchedCore);
                setPreviousMembers(fetchedPrevious);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching members:", err);
                setError("Unable to load team members at this time.");
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const MemberCard = ({ member, variant = "default" }) => {
        const isBoard = variant === "board";

        // Assuming backend returns socials as an object, e.g., { linkedin: "url", ... }
        const socials = member.socials || {};

        return (
            <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${isBoard ? 'hover:-translate-y-2' : 'hover:-translate-y-1'}`}>
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#C0003D] to-[#FF4D7D] opacity-100">
                    <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                </div>

                {/* Profile Image */}
                <div className="relative pt-16 px-6 text-center">
                    <div className={`relative mx-auto rounded-full p-1 bg-white ${isBoard ? 'w-32 h-32' : 'w-24 h-24'} shadow-md mb-4 group-hover:scale-105 transition-transform duration-300`}>
                        <img
                            src={member.image || "https://via.placeholder.com/400?text=Member"}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="mb-6">
                        <h3 className={`${isBoard ? 'text-2xl' : 'text-xl'} font-bold text-gray-800 mb-1`}>{member.name}</h3>
                        <p className="text-[#C0003D] font-medium text-sm tracking-wide uppercase mb-3">{member.role}</p>
                        <p className="text-gray-500 text-sm italic">"{member.bio || 'Finanza Club Member'}"</p>
                    </div>

                    {/* Socials */}
                    <div className={`flex justify-center gap-4 pb-8 transition-colors duration-300`}>
                        {socials.linkedin && (
                            <a href={socials.linkedin} className="text-gray-400 hover:text-[#0077b5] transition-colors p-2 bg-gray-50 rounded-full hover:bg-blue-50">
                                <FaLinkedinIn size={18} />
                            </a>
                        )}
                        {socials.github && (
                            <a href={socials.github} className="text-gray-400 hover:text-black transition-colors p-2 bg-gray-50 rounded-full hover:bg-gray-200">
                                <FaGithub size={18} />
                            </a>
                        )}
                        {socials.twitter && (
                            <a href={socials.twitter} className="text-gray-400 hover:text-[#1DA1F2] transition-colors p-2 bg-gray-50 rounded-full hover:bg-blue-50">
                                <FaTwitter size={18} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Hover overlay border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C0003D]/10 rounded-2xl pointer-events-none transition-colors"></div>
            </div>
        );
    };

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
        <div className="bg-[#FAF9F6] min-h-screen pt-20 pb-20">

            {/* Header */}
            <section className="text-center mb-20 px-4">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">Our <span className="text-[#C0003D]">Team</span></h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Meet the visionaries, creators, and leaders driving the Finanza Club forward.
                </p>
            </section>

            {/* Board Members Section */}
            {boardMembers.length > 0 && (
                <section className="container mx-auto px-4 mb-24">
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-px bg-gray-300 w-16"></div>
                        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-widest">Board Members</h2>
                        <div className="h-px bg-gray-300 w-16"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {boardMembers.map((m, i) => (
                            <MemberCard key={i} member={m} variant="board" />
                        ))}
                    </div>
                </section>
            )}

            {/* Core Team Section */}
            {coreTeam.length > 0 && (
                <section className="container mx-auto px-4 mb-24">
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-px bg-gray-300 w-16"></div>
                        <h2 className="text-2xl font-bold text-gray-700 uppercase tracking-widest">Core Team</h2>
                        <div className="h-px bg-gray-300 w-16"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreTeam.map((m, i) => (
                            <MemberCard key={i} member={m} />
                        ))}
                    </div>
                </section>
            )}

            {/* Previous Members Section */}
            {previousMembers.length > 0 && (
                <section className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-12 justify-center">
                        <div className="h-px bg-gray-300 w-16"></div>
                        <h2 className="text-2xl font-bold text-gray-500 uppercase tracking-widest">Alumni & Previous Members</h2>
                        <div className="h-px bg-gray-300 w-16"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {previousMembers.map((m, i) => (
                            <MemberCard key={i} member={m} />
                        ))}
                    </div>
                </section>
            )}

            {boardMembers.length === 0 && coreTeam.length === 0 && previousMembers.length === 0 && (
                <div className="text-center text-gray-500">No members found.</div>
            )}

        </div>
    );
}
