import React, { useState, useEffect } from 'react';
import { User, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Mediator Interface
interface ChatMediator {
  sendMessage(msg: string, user: UserComponent): void;
  addUser(user: UserComponent): void;
}

// Concrete Mediator
class ChatRoom implements ChatMediator {
  private users: UserComponent[] = [];

  addUser(user: UserComponent): void {
    this.users.push(user);
  }

  sendMessage(msg: string, sender: UserComponent): void {
    this.users.forEach(user => {
      // Don't send back to sender
      if (user !== sender) {
        user.receive(msg, sender.name);
      }
    });
  }
}

// Colleague
class UserComponent {
  constructor(public name: string, private mediator: ChatMediator, private onReceive: (msg: string, from: string) => void) {
    mediator.addUser(this);
  }

  send(msg: string) {
    this.mediator.sendMessage(msg, this);
  }

  receive(msg: string, from: string) {
    this.onReceive(msg, from);
  }
}

const MediatorDemo = () => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<{from: string, msg: string}[]>([]);
  const [mediator] = useState(() => new ChatRoom()); // Persistent mediator instance
  
  // Simulated Users
  const [user1, setUser1] = useState<UserComponent | null>(null);
  const [user2, setUser2] = useState<UserComponent | null>(null);
  const [user3, setUser3] = useState<UserComponent | null>(null);

  useEffect(() => {
    // Init users and register to mediator
    const u1 = new UserComponent("Alice", mediator, (msg, from) => addLog(from, msg));
    const u2 = new UserComponent("Bob", mediator, (msg, from) => addLog(from, msg));
    const u3 = new UserComponent("Charlie", mediator, (msg, from) => addLog(from, msg));
    
    setUser1(u1);
    setUser2(u2);
    setUser3(u3);
  }, []);

  const addLog = (from: string, msg: string) => {
    setLogs(prev => [...prev, { from, msg }]);
  };

  const handleSend = (user: UserComponent | null, msg: string) => {
    if (user) user.send(msg);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('mediator.demo.title')}</h3>
        
        <div className="space-y-4">
           <UserControl user={user1} color="bg-pink-600" onSend={(msg) => handleSend(user1, msg)} t={t} />
           <UserControl user={user2} color="bg-blue-600" onSend={(msg) => handleSend(user2, msg)} t={t} />
           <UserControl user={user3} color="bg-green-600" onSend={(msg) => handleSend(user3, msg)} t={t} />
        </div>
      </div>

      <div className="bg-black rounded-xl p-6 border border-gray-200 dark:border-gray-800 h-[400px] overflow-y-auto flex flex-col-reverse">
         {logs.length === 0 && <div className="text-gray-600 text-center my-auto">{t('mediator.demo.noMessages')}</div>}
         {logs.map((log, i) => (
           <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{log.from}:</span> <span className="text-gray-900 dark:text-white text-sm">{log.msg}</span>
           </motion.div>
         ))}
      </div>
    </div>
  );
};

const UserControl = ({ user, color, onSend, t }: any) => {
  const [msg, setMsg] = useState("");
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex items-center gap-4">
       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold ${color}`}>
         {user?.name[0]}
       </div>
       <div className="flex-1">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{user?.name}</div>
          <div className="flex gap-2">
             <input 
               className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 text-sm text-gray-900 dark:text-white flex-1"
               placeholder={t('mediator.demo.saySomething')}
               value={msg}
               onChange={e => setMsg(e.target.value)}
             />
             <button onClick={() => { onSend(msg); setMsg(""); }} className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-900 dark:text-white">
               <Send size={16} />
             </button>
          </div>
       </div>
    </div>
  );
};

export default MediatorDemo;
