import React, { useState } from 'react';
import { GamifiedHeader } from '@shared/components/layout/GamifiedHeader';
import { DetectiveCard } from '@shared/components/base/DetectiveCard';
import { DetectiveButton } from '@shared/components/base/DetectiveButton';
import { UserTable } from '@features/auth/components/UserTable';
import { Plus, Search, Filter, Download, Users } from 'lucide-react';

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users data
  const mockUsers = [
    { id: '1', email: 'student1@glit.com', fullName: 'Ana García', role: 'student', status: 'active', createdAt: '2024-01-15' },
    { id: '2', email: 'teacher1@glit.com', fullName: 'Carlos Pérez', role: 'admin_teacher', status: 'active', createdAt: '2024-01-10' },
    { id: '3', email: 'admin@glit.com', fullName: 'María López', role: 'super_admin', status: 'active', createdAt: '2024-01-05' },
    { id: '4', email: 'student2@glit.com', fullName: 'Pedro Martínez', role: 'student', status: 'inactive', createdAt: '2024-02-01' },
    { id: '5', email: 'teacher2@glit.com', fullName: 'Laura González', role: 'admin_teacher', status: 'active', createdAt: '2024-02-15' },
  ];

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }
    console.log(`Bulk ${action}:`, selectedUsers);
  };

  const handleExport = () => {
    console.log('Exporting users to CSV');
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-detective-bg to-detective-bg-secondary">
      <GamifiedHeader user={{ email: 'admin@glit.com' }} />

      <main className="detective-container py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-detective-orange" />
            <div>
              <h1 className="text-detective-title">Gestión de Usuarios</h1>
              <p className="text-detective-small text-gray-400">{filteredUsers.length} usuarios encontrados</p>
            </div>
          </div>
          <div className="flex gap-2">
            <DetectiveButton variant="blue" icon={<Download className="w-4 h-4" />} onClick={handleExport}>
              Export CSV
            </DetectiveButton>
            <DetectiveButton variant="primary" icon={<Plus className="w-4 h-4" />}>
              Nuevo Usuario
            </DetectiveButton>
          </div>
        </div>

        {/* Advanced Filters */}
        <DetectiveCard className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-detective-orange" />
            <h3 className="text-detective-subtitle">Filtros Avanzados</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="input-detective pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input-detective"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">Todos los roles</option>
              <option value="student">Estudiante</option>
              <option value="admin_teacher">Profesor</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <select
              className="input-detective"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="suspended">Suspendido</option>
            </select>
          </div>
        </DetectiveCard>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <DetectiveCard className="mb-6 bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-center justify-between">
              <p className="text-detective-base">{selectedUsers.length} usuario(s) seleccionado(s)</p>
              <div className="flex gap-2">
                <DetectiveButton variant="green" size="sm" onClick={() => handleBulkAction('activate')}>
                  Activar
                </DetectiveButton>
                <DetectiveButton variant="primary" size="sm" onClick={() => handleBulkAction('deactivate')}>
                  Desactivar
                </DetectiveButton>
                <DetectiveButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Eliminar
                </DetectiveButton>
              </div>
            </div>
          </DetectiveCard>
        )}

        <DetectiveCard>
          <UserTable
            users={filteredUsers}
            onEdit={(id) => console.log('Edit', id)}
            onDelete={(id) => console.log('Delete', id)}
          />
        </DetectiveCard>
      </main>
    </div>
  );
}
