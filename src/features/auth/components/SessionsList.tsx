import React from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

export const SessionsList: React.FC = () => {
  const mockSessions = [
    { id: '1', device: 'Chrome on Windows', ip: '192.168.1.100', lastActive: '2 min ago', current: true },
    { id: '2', device: 'Safari on iPhone', ip: '192.168.1.101', lastActive: '1 hour ago', current: false },
    { id: '3', device: 'Firefox on Mac', ip: '192.168.1.102', lastActive: '3 hours ago', current: false },
  ];

  return (
    <div className="space-y-3">
      {mockSessions.map((session) => (
        <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            {session.device.includes('iPhone') ? (
              <Smartphone className="w-5 h-5 text-gray-600" />
            ) : (
              <Monitor className="w-5 h-5 text-gray-600" />
            )}
            <div>
              <p className="text-detective-body font-medium">{session.device}</p>
              <p className="text-detective-small text-gray-500">
                {session.ip} • {session.lastActive}
              </p>
            </div>
          </div>
          {session.current ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
              Sesión Actual
            </span>
          ) : (
            <button className="p-2 hover:bg-red-50 rounded">
              <X className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
