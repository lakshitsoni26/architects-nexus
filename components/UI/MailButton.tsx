import React from 'react';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const MailButton: React.FC = () => {
    return (
        <motion.a
            href="mailto:lakshitsoni26@gmail.com"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="fixed bottom-16 right-12 z-50 w-14 h-14 bg-cyber-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] hover:scale-110 transition-all duration-300 group"
        >
            <Mail className="w-6 h-6 text-black group-hover:rotate-12 transition-transform duration-300" />
        </motion.a>
    );
};
