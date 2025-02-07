/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const filterTodos = todos.filter(todo => {
    const filteredTodoStatus =
      selected === 'all' ||
      (selected === 'completed' && todo.completed) ||
      (selected === 'active' && !todo.completed);
    const filteredTodoQuery = todo.title
      .toLowerCase()
      .trim()
      .includes(query.toLowerCase());

    return filteredTodoStatus && filteredTodoQuery;
  });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const handleShowModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);

    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      // eslint-disable-next-line
      .catch(console.error);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setSelectedTodo(null);
  };

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                selected={selected}
                query={query}
                handleSelect={handleSelect}
                handleQuery={handleQuery}
                handleQueryClear={handleQueryClear}
              />
            </div>

            <div className="block">
              {loading && <Loader />}
              {!loading && filterTodos.length > 0 && (
                <TodoList todos={filterTodos} onShowModal={handleShowModal} />
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedTodo && selectedUser && (
        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
