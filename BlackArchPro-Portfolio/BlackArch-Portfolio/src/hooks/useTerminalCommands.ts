import { useState, useEffect } from 'react';

export const useTerminalCommands = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');

  const commandList = [
    'initializing system...',
    'mounting /dev/portfolio...',
    'checking system integrity...',
    'loading kernel modules...',
    'starting network services...',
    'configuring firewall...',
    'establishing secure connection...',
    'running security checks...',
    'loading encryption modules...',
    'initializing GUI interface...',
    'system ready.'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < commandList.length) {
        setCurrentCommand(commandList[currentIndex]);
        setTimeout(() => {
          setCommands(prev => [...prev, commandList[currentIndex]]);
          setCurrentCommand('');
        }, 800);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { commands, currentCommand };
};