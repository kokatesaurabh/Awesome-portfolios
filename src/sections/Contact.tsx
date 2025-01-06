import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useContact } from '../hooks/useContact';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { sendMessage, loading, error, success } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(formData);
  };

  return (
    <section className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Initialize Connection
          </span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyan-500 mb-2">Identifier</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-cyan-500 mb-2">Communication Protocol</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-cyan-500 mb-2">Transmission Data</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors h-32"
                placeholder="Your message..."
                required
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">
                Transmission failed: {error}
              </div>
            )}
            
            {success && (
              <div className="text-green-500 text-sm">
                Transmission successful!
              </div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyan-500 text-black font-medium py-3 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Initialize Transmission
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};