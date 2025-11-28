import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Terminal, Send, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { UplinkFormData } from '../../types';

const formSchema = z.object({
    identity: z.string().min(2, "Identity required"),
    email: z.string().email("Invalid frequency"),
    objective: z.string().min(1, "Objective required"),
    parameters: z.string().min(10, "Parameters too short"),
    budget: z.number().min(1000, "Insufficient funds"),
});

export const UplinkTerminal: React.FC = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const terminalRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = useForm<UplinkFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { budget: 5000 }
    });

    const budgetValue = watch("budget");

    // Audio Context Ref
    const audioCtxRef = useRef<AudioContext | null>(null);

    const playTypingSound = () => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;

            // Resume context if suspended (browser policy)
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            // Sci-fi high pitched blip
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        } catch (e) {
            // Ignore audio errors
        }
    };

    const nextStep = async () => {
        playTypingSound();
        let isValid = false;
        if (step === 1) isValid = await trigger(['identity', 'email']);
        if (step === 2) isValid = await trigger(['objective']);
        if (step === 3) isValid = await trigger(['parameters']);

        if (isValid) setStep(s => s + 1);
    };

    const onSubmit = async (data: UplinkFormData) => {
        setIsSubmitting(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("Transmission Sent:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    return (
        <section id="uplink" className="py-24 px-4 bg-black/40 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-secondary to-transparent" />

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-orbitron font-bold mb-4 text-white"><span className="text-cyber-secondary">UPLINK</span> TERMINAL</h2>
                    <p className="text-gray-400 font-space">Initialize secure connection. Encrypted channel active.</p>
                </motion.div>

                <div className="relative bg-black border border-cyber-secondary/30 rounded-lg shadow-[0_0_30px_rgba(112,0,223,0.15)] overflow-hidden font-mono text-sm md:text-base">
                    {/* Terminal Header */}
                    <div className="bg-gray-900/50 border-b border-cyber-secondary/20 p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-gray-500 text-xs">root@architects-nexus:~</div>
                        <Terminal className="w-4 h-4 text-cyber-secondary" />
                    </div>

                    {/* Terminal Body */}
                    <div className="p-6 md:p-10 min-h-[400px] relative" ref={terminalRef}>

                        <AnimatePresence mode="wait">
                            {!isSuccess ? (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-8"
                                    onKeyDown={playTypingSound} // Global typing sound for form
                                >
                                    {/* Step 1: Identity */}
                                    {step === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-cyber-secondary mb-4">&gt; IDENTIFY OPERATIVE</div>
                                            <div className="space-y-2">
                                                <label className="text-gray-400 block text-xs tracking-widest">CODENAME / NAME</label>
                                                <div className="flex items-center border-b border-gray-700 focus-within:border-cyber-primary transition-colors">
                                                    <ChevronRight className="w-4 h-4 text-cyber-primary mr-2" />
                                                    <input
                                                        {...register("identity")}
                                                        className="bg-transparent w-full py-2 outline-none text-white placeholder-gray-600"
                                                        placeholder="Enter identifier..."
                                                        autoFocus
                                                    />
                                                </div>
                                                {errors.identity && <span className="text-red-500 text-xs flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.identity.message}</span>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-gray-400 block text-xs tracking-widest">COMMUNICATION FREQUENCY / EMAIL</label>
                                                <div className="flex items-center border-b border-gray-700 focus-within:border-cyber-primary transition-colors">
                                                    <ChevronRight className="w-4 h-4 text-cyber-primary mr-2" />
                                                    <input
                                                        {...register("email")}
                                                        className="bg-transparent w-full py-2 outline-none text-white placeholder-gray-600"
                                                        placeholder="Enter secure frequency..."
                                                    />
                                                </div>
                                                {errors.email && <span className="text-red-500 text-xs flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.email.message}</span>}
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <button type="button" onClick={nextStep} className="text-cyber-primary hover:text-white border border-cyber-primary hover:bg-cyber-primary/20 px-6 py-2 rounded transition-all">
                                                    PROCEED &gt;&gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Objective */}
                                    {step === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-cyber-secondary mb-4">&gt; SELECT OBJECTIVE</div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {['Smart Contract Audit', 'Full dApp Architecture', 'DeFi Consultation', 'Custom Integration'].map((opt) => (
                                                    <label key={opt} className="cursor-pointer" onClick={playTypingSound}>
                                                        <input
                                                            type="radio"
                                                            value={opt}
                                                            {...register("objective")}
                                                            className="peer sr-only"
                                                        />
                                                        <div className="p-4 border border-gray-700 rounded hover:border-cyber-primary peer-checked:bg-cyber-primary/10 peer-checked:border-cyber-primary transition-all text-center text-gray-300 peer-checked:text-cyber-primary">
                                                            {opt}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.objective && <span className="text-red-500 text-xs flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> Selection Required</span>}

                                            <div className="pt-4 flex justify-between">
                                                <button type="button" onClick={() => setStep(1)} className="text-gray-500 hover:text-white px-4 py-2">
                                                    &lt;&lt; BACK
                                                </button>
                                                <button type="button" onClick={nextStep} className="text-cyber-primary hover:text-white border border-cyber-primary hover:bg-cyber-primary/20 px-6 py-2 rounded transition-all">
                                                    PROCEED &gt;&gt;
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Parameters & Budget */}
                                    {step === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            <div className="text-cyber-secondary mb-4">&gt; MISSION PARAMETERS</div>

                                            <div className="space-y-2">
                                                <label className="text-gray-400 block text-xs tracking-widest">BRIEFING DATA</label>
                                                <textarea
                                                    {...register("parameters")}
                                                    className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:border-cyber-primary outline-none min-h-[100px]"
                                                    placeholder="Detail the mission requirements..."
                                                />
                                                {errors.parameters && <span className="text-red-500 text-xs flex items-center"><AlertCircle className="w-3 h-3 mr-1" /> {errors.parameters.message}</span>}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-gray-400 block text-xs tracking-widest flex justify-between">
                                                    <span>RESOURCE ALLOCATION (BUDGET)</span>
                                                    <span className="text-cyber-primary font-bold">${budgetValue?.toLocaleString()}</span>
                                                </label>
                                                <input
                                                    type="range"
                                                    min="1000"
                                                    max="50000"
                                                    step="500"
                                                    {...register("budget", { valueAsNumber: true })}
                                                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyber-primary"
                                                    onChange={(e) => {
                                                        setValue("budget", parseInt(e.target.value));
                                                        playTypingSound();
                                                    }}
                                                />
                                                <div className="flex justify-between text-xs text-gray-600 font-mono">
                                                    <span>$1k</span>
                                                    <span>$50k+</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-between items-center">
                                                <button type="button" onClick={() => setStep(2)} className="text-gray-500 hover:text-white px-4 py-2">
                                                    &lt;&lt; BACK
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="relative overflow-hidden bg-cyber-primary text-black font-bold px-8 py-3 rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? <span className="animate-pulse">TRANSMITTING...</span> : 'INITIALIZE'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.form>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-center py-12"
                                >
                                    <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                                    <h3 className="text-2xl font-orbitron text-white mb-2">TRANSMISSION RECEIVED</h3>
                                    <p className="text-gray-400 font-space max-w-md">
                                        The Architect has received your request. Expect encrypted response on the provided frequency within 24 standard hours.
                                    </p>
                                    <button
                                        onClick={() => { setIsSuccess(false); setStep(1); }}
                                        className="mt-8 text-sm text-gray-500 hover:text-cyber-primary underline underline-offset-4"
                                    >
                                        Initiate New Uplink
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20" />
                    </div>
                </div>
            </div>
        </section>
    );
};
