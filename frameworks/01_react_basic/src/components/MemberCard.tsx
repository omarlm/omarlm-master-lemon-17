import React from "react";
import { OrganizationMember } from "../types/types";

interface MemberCardProps {
    member: OrganizationMember;
    onViewProfile: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onViewProfile }) => {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Contenido principal */}
            <div className="flex flex-col items-center p-5">
                {/* Avatar */}
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={member.avatar_url}
                    alt={member.login}
                />
                {/* Nombre del usuario */}
                <h5 className="mb-1 text-xl font-medium text-gray-900">{member.login}</h5>
                {/* ID del usuario */}
                <span className="text-sm text-gray-500">ID: {member.id}</span>
                {/* Botón para ver detalles */}
                <div className="flex mt-4">
                    <button
                        onClick={onViewProfile}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberCard;
