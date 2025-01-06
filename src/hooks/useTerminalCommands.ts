import { useState, useEffect } from 'react';

export const useTerminalCommands = () => {
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');

  const commandList = [
    'loading BlackArch Linux v2024.03.01...',
    'checking boot parameters...',
    'mounting /dev/portfolio...',
    'loading kernel modules...',
    '[OK] loaded module: cybersecurity.ko',
    '[OK] loaded module: exploitation.ko',
    '[OK] loaded module: zero-day.ko',
    'initializing system integrity...',
    'checking memory regions...',
    'starting network services...',
    '[OK] started service: firewall',
    '[OK] started service: encryption',
    '[OK] started service: anonymizer',
    'configuring secure protocols...',
    'establishing encrypted connection...',
    '[WARNING] potential intrusion detected',
    '[OK] threat neutralized',
    'loading GUI interface...',
    'initializing matrix protocol...',
    'system ready. welcome to the void.'
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