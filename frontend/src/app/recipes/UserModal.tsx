import React, { useState, useEffect } from 'react';
import apiClient from '@lib/apiClient'; // Ensure apiClient is correctly imported
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 styles
import { FaUserAlt, FaPaperPlane } from 'react-icons/fa';
import recipeCard from '@/app/recipes/recipeCard'; // Font Awesome icons

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRecipe: (userId: string) => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSendRecipe }) => {
  const [users, setUsers] = useState<any[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      if (isOpen) { // Only fetch users when the modal is open
        try {
          const response = await apiClient.get('users');
          console.log(response);
          setUsers(response || []);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };

    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, [isOpen]);

  return (
    <div className={`modal fade ${isOpen ? 'show' : ''}`} tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-sm">
        <div className="modal-content rounded-3 shadow" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title" id="userModalLabel"><FaUserAlt /> Share Recipe</h5>
            <button type="button" className="btn-close text-white" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="text-muted mb-3">Choose a user to send the recipe to:</p>

            <div className="row row-cols-1 g-2">
              {users.map((user) => (
                <div className="col" key={user.id}>
                  <div className="card shadow-sm rounded-3 border-0">
                    <div className="card-body text-center p-2">
                      <h6 className="card-title text-primary">{user.username}</h6>
                      <button
                        className="btn btn-primary btn-sm w-100"
                        onClick={() => onSendRecipe(user.id)}
                      >
                        <FaPaperPlane /> Send
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
