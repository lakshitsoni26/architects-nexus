import React from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, ETH_PRICE_USD } from '../../constants';
import { HoloCard } from '../UI/HoloCard';
import { ShoppingCart, Package } from 'lucide-react';

export const SupplyDepot: React.FC = () => {
  const handleBuy = (title: string) => {
    // Simulate Stripe Integration
    alert(`Initiating secure transaction for: ${title}. Redirecting to Stripe Gateway...`);
  };

  return (
    <section id="arsenal" className="py-24 px-4 relative bg-black/50">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l-4 border-cyber-accent pl-4"
                >
                    <h3 className="text-cyber-accent font-space font-bold tracking-widest text-sm">MODULE_04</h3>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold mt-2">SUPPLY DEPOT</h2>
                    <p className="text-gray-400 font-space mt-2 max-w-md">
                        Advanced development assets for the decentralized operative. Acquire schematics and protocol buffers.
                    </p>
                </motion.div>
                <div className="mt-4 md:mt-0 font-space text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Market Status</div>
                    <div className="text-cyber-primary animate-pulse">LIVE // OPEN</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRODUCTS.map((product) => (
                    <HoloCard key={product.id} className="h-full">
                        <div className="flex flex-col h-full">
                            {/* Product Visual */}
                            <div className="relative aspect-square mb-6 overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-500">
                                <img 
                                    src={product.image} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                                    <Package className="w-5 h-5 text-cyber-accent" />
                                    <span className="font-orbitron text-xs tracking-wider">ASSET_ID: {product.id.toUpperCase()}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <h3 className="text-2xl font-orbitron font-bold text-white mb-2">{product.title}</h3>
                            <p className="text-gray-400 text-sm font-space mb-6 flex-grow">{product.description}</p>

                            {/* Features */}
                            <ul className="mb-6 space-y-2">
                                {product.features.map((feat, i) => (
                                    <li key={i} className="flex items-center text-xs text-gray-300 font-space">
                                        <span className="w-1.5 h-1.5 bg-cyber-primary mr-2 rounded-full" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            {/* Price & Action */}
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-orbitron font-bold text-cyber-primary">${product.priceUsd}</div>
                                    <div className="text-xs text-gray-500 font-mono">
                                        Ξ {(product.priceUsd / ETH_PRICE_USD).toFixed(4)} ETH
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleBuy(product.title)}
                                    className="p-3 bg-white/10 hover:bg-cyber-primary hover:text-black rounded-full transition-all duration-300 group/btn"
                                >
                                    <ShoppingCart className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </HoloCard>
                ))}
            </div>
        </div>
    </section>
  );
};