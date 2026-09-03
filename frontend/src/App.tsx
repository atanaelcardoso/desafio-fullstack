import { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './contexts/authContext';
import { useTasksController } from './domain/hooks/useTasksController';
import type { Task, TaskStatus } from './domain/entity/tasks';
import { Input } from './components/input';
import { Button } from './components/button';
import { DefaultLayout } from './layout/defaultLayout';

export default function App() {
  const { signed, login, register } = useContext(AuthContext);
  const taskController = useTasksController();
  const navigate = useNavigate();

  const [view, setView] = useState<'login' | 'register' | 'list' | 'detail'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [filter, setFilter] = useState<TaskStatus | ''>('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (signed) {
      if (view === 'login' || view === 'register') {
        setView('list');
        navigate('/tasks');
      }
      taskController.fetchTasks(filter);
    } else {
      if (view === 'list' || view === 'detail') {
        setView('login');
        navigate('/login');
      }
    }
  }, [signed, filter]);

  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <Routes>
      <Route path="/login" element={
        <div className="container-center">
          <div className="auth-card">
            <h2>{view === 'login' ? 'Acesso ao Sistema' : 'Nova Conta'}</h2>
            <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={async () => {
              try {
                if (view === 'login') {
                  await login(email, password);
                  setView('list');
                  navigate('/tasks');
                } else {
                  await register(email, password);
                  alert('Registrado!');
                  setView('login');
                  navigate('/login');
                }
              } catch { alert('Erro na autenticação. Verifique suas credenciais.'); }
            }}>{view === 'login' ? 'Entrar' : 'Salvar Registro'}</Button>
            <p className="auth-link" onClick={() => {
              setView(view === 'login' ? 'register' : 'login');
              navigate(view === 'login' ? '/register' : '/login');
            }}>
              {view === 'login' ? 'Não tem conta? Cadastre-se' : 'Fazer Login'}
            </p>
          </div>
        </div>
      } />

      <Route path="/register" element={
        <div className="container-center">
          <div className="auth-card">
            <h2>Nova Conta</h2>
            <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={async () => {
              try {
                await register(email, password);
                alert('Registrado!');
                setView('login');
                navigate('/login');
              } catch { alert('Erro na autenticação. Verifique suas credenciais.'); }
            }}>Salvar Registro</Button>
            <p className="auth-link" onClick={() => { setView('login'); navigate('/login'); }}>
              Fazer Login
            </p>
          </div>
        </div>
      } />

      <Route path="/tasks" element={
        <DefaultLayout>
          <div>
            <form onSubmit={async (e) => { e.preventDefault(); await taskController.handleCreate(taskTitle); setTaskTitle(''); taskController.fetchTasks(filter); }} className="task-form">
              <Input type="text" placeholder="Escreva o nome da tarefa..." value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />
              <Button type="submit">Adicionar</Button>
            </form>

            <div className="filter-bar">
              {(['', 'não iniciado', 'em andamento', 'concluído'] as const).map(st => (
                <button key={st} className={filter === st ? 'active' : ''} onClick={() => setFilter(st)}>
                  {st === '' ? 'Todas' : capitalize(st)}
                </button>
              ))}
            </div>

            <div className="task-list">
              {taskController.tasks.map((task, index) => (
                <div key={`${task.id}-${index}`} className="task-item" onClick={() => { setSelectedTask(task); setTaskTitle(task.title); setView('detail'); navigate(`/tasks/${task.id}`); }}>
                  <div>
                    <h4>{task.title}</h4>
                    <span className={`badge ${task.status.replace(' ', '-')}`}>{capitalize(task.status)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DefaultLayout>
      } />

      <Route path="/tasks/:id" element={
        <DefaultLayout>
          {selectedTask && (
            <div className="detail-card">
              <h3>Modificar Registro</h3>

              <label className="field-label">Nome da Tarefa:</label>
              <Input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} disabled={selectedTask.status === 'concluído'} />

              <label className="field-label" style={{ marginTop: '15px' }}>Status da Tarefa:</label>
              {selectedTask.status === 'concluído' ? (
                <p className="locked-status">Esta tarefa foi concluída e está travada para edições.</p>
              ) : (
                <select className="status-select" defaultValue={selectedTask.status} onChange={async (e) => { await taskController.handleUpdate(selectedTask.id, taskTitle, e.target.value as TaskStatus); setView('list'); navigate('/tasks'); }}>
                  <option value="não iniciado">Não Iniciado</option>
                  <option value="em andamento">Em Andamento</option>
                  <option value="concluído">Concluído</option>
                </select>
              )}

              <div className="detail-actions">
                <Button variant="danger" onClick={async () => { await taskController.handleDelete(selectedTask.id); setView('list'); navigate('/tasks'); }}>Excluir</Button>
                <Button variant="primary" onClick={() => { setView('list'); navigate('/tasks'); }}>Cancelar</Button>
              </div>
            </div>
          )}
        </DefaultLayout>
      } />
      <Route path="*" element={<Navigate to={signed ? "/tasks" : "/login"} />} />
    </Routes>
  );
}
