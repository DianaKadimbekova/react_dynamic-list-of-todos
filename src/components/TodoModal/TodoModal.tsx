import React, { useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo;
  user: User;
  onCLose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({
  todo,
  user,
  onCLose,
}) => {
  const [crossPressed, setCrossPressed] = useState(false);

  const handleButtonDeleteModal = () => {
    setCrossPressed(true);

    if (!crossPressed) {
      return setCrossPressed(false);
    }
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onCLose} />

      {false ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onCLose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            {todo.completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">{user.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>

                {' by '}

                <a href="mailto:Sincere@april.biz">{user.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
