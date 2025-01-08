import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send } from 'lucide-react';

export const Contact = () => {
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
            Get In Touch
          </span>
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.form 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Message</label>
              <textarea
                className="w-full bg-gray-900/50 border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors h-32"
                placeholder="Your message..."
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-cyan-500 text-black font-medium py-3 rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </motion.button>
          </motion.form>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center gap-8"
          >
            <a href="mailto:your@email.com" className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors">
              <Mail className="w-5 h-5" />
              Email Me
            </a>
            <a href="#" className="flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors">
              <MessageSquare className="w-5 h-5" />
              Let's Chat
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};