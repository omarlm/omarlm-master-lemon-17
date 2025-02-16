import React, { useState, useEffect } from "react";
import { fetchOrganizationMembers } from "../services/githubService";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import ErrorMessage from "../components/ErrorMessage";
import Modal from "../components/Modal";
import { OrganizationMember } from "../types/types";
import Spinner from "../components/Spinner";

const OrganizationView: React.FC = () => {
    const [organizationName, setOrganizationName] = useState<string>("lemoncode");
    const [members, setMembers] = useState<OrganizationMember[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const [selectedMember, setSelectedMember] = useState<OrganizationMember | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


    const [currentPage, setCurrentPage] = useState<number>(1);
    const perPage = 9;
    const [hasMoreMembers, setHasMoreMembers] = useState<boolean>(true);


    const fetchMembers = async (name: string, page: number = 1) => {
        setLoading(true);
        setError(null);

        try {
            const data = await fetchOrganizationMembers(name, perPage, page);
            setMembers(data);


            setHasMoreMembers(data.length === perPage);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMembers(organizationName, currentPage);
    }, [organizationName, currentPage]);


    const handleSearch = (name: string) => {
        setOrganizationName(name);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (hasMoreMembers) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleViewProfile = (member: OrganizationMember) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    return (
        <div className="p-4">
            <SearchBar
                onSearch={handleSearch}
                placeholder="Search GitHub organization..."
                debounce={false}
            />
            {loading && (
                <div className="my-4">
                    <Spinner />
                </div>
            )}            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
                <>
                    <ItemList
                        items={members}
                        renderItem={(member) => (
                            <div className="border border-gray-300 rounded-lg shadow-md p-4 text-center bg-white">
                                <img
                                    src={member.avatar_url}
                                    alt={member.login}
                                    className="w-20 h-20 rounded-full mx-auto mb-3 shadow-sm"
                                />
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{member.login}</h2>
                                {/* Mantengo tu botón exactamente igual */}
                                <button
                                    onClick={() => handleViewProfile(member)}
                                    className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer`}
                                >
                                    View Profile
                                </button>
                            </div>
                        )}
                    />

                    {/* Controles de paginado */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-4 ${currentPage === 1
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 cursor-pointer"
                                }`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-700 font-medium">Page {currentPage}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={!hasMoreMembers}
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:outline-none focus:ring-4 ${!hasMoreMembers
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-700 text-white hover:bg-blue-800 focus:ring-blue-300 cursor-pointer"
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedMember && (
                    <div className="flex flex-col items-center text-center">
                        <img
                            src={selectedMember.avatar_url}
                            alt={selectedMember.login}
                            className="w-24 h-24 rounded-full mb-4 shadow-lg"
                        />
                        <h2 className="text-2xl font-bold mb-2">{selectedMember.login}</h2>
                        <p className="text-gray-500 text-sm mb-4">ID: {selectedMember.id}</p>
                        <a
                            href={selectedMember.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                        >
                            Visit GitHub Profile
                        </a>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrganizationView;
