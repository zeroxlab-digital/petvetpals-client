import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { Zap, Star } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAddEnergyLevelMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';

const EnergyLevel = ({ petId, energyLevel }) => {
  let latestEnergyLevel = 0;
  if (energyLevel.length > 0) {
    latestEnergyLevel = energyLevel.reduce(
      (latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
    ).value || 0;
  }

  const [showLogModal, setShowLogModal] = useState(false);
  const [newEnergy, setNewEnergy] = useState(latestEnergyLevel);

  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getEnergyMessage = (value) => {
    if (value >= 80) return 'Supercharged! Your pet is buzzing with energy!';
    if (value >= 50) return 'Healthy spark – normal energy levels.';
    if (value >= 30) return 'A bit mellow – could use playtime.';
    return 'Low spark – may need rest or attention.';
  };

  const getColor = (value) => {
    if (value >= 80) return '#facc15'; // bright yellow
    if (value >= 50) return '#eab308'; // golden yellow
    if (value >= 30) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const circleRef = useRef(null);
  const zapControls = useAnimation();

  const handlePointerMove = (e) => {
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    if (angle > 100 * 3.6) angle = 100 * 3.6;
    const newVal = Math.round(angle / 3.6);
    setNewEnergy(newVal);

    // Wiggle Zap ⚡
    zapControls.start({
      rotate: [0, -15, 15, -8, 8, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
  };

  const [addEnergyLevel, { isLoading }] = useAddEnergyLevelMutation();
  const handleSave = async () => {
    try {
      const res = await addEnergyLevel({
        id: petId,
        energy_level: newEnergy
      }).unwrap();
      toast.success("Energy level logged successfully!", { autoClose: 2000 })
    } catch (error) {
      console.log(error)
      toast.error("Ops! Failed to log energy level", { autoClose: 2000 })
    } finally {
      setShowLogModal(false);
    }
  };

  const strokeDashoffset = circumference - (newEnergy / 100) * circumference;

  const angle = (newEnergy / 100) * 360 - 90;
  const zapX = radius + normalizedRadius * Math.cos((angle * Math.PI) / 180);
  const zapY = radius + normalizedRadius * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-600">Energy Level</h3>
        <Zap className="h-4 w-4 text-yellow-500" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-bold">{latestEnergyLevel}%</div>
        <button
          onClick={() => setShowLogModal(true)}
          className="w-20 text-sm border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-50 transition-colors"
        >
          Log new
        </button>
      </div>

      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${latestEnergyLevel}%` }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-full"
          style={{ background: getColor(latestEnergyLevel) }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {getEnergyMessage(latestEnergyLevel)}
      </p>

      {showLogModal && (
        <ModalPopup
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          title="Log Energy Level"
          icon={<Zap className="animate-pulse" />}
        >
          <div className="flex flex-col items-center gap-8 p-6 select-none bg-gradient-to-b from-transparent to-gray-50/50 rounded-b-3xl">

            <div
              ref={circleRef}
              className="relative flex items-center justify-center touch-none group"
              style={{ width: radius * 2, height: radius * 2 }}
              onPointerDown={(e) => {
                handlePointerMove(e);
                const moveHandler = (ev) => handlePointerMove(ev);
                const upHandler = () => {
                  window.removeEventListener('pointermove', moveHandler);
                  window.removeEventListener('pointerup', upHandler);
                };
                window.addEventListener('pointermove', moveHandler);
                window.addEventListener('pointerup', upHandler);
              }}
            >

              <svg height={radius * 2} width={radius * 2} className="transform -rotate-90 drop-shadow-sm">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle
                  stroke="#f3f4f6"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />

                <motion.circle
                  stroke={getColor(newEnergy)}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeDasharray={circumference}
                  animate={{ strokeDashoffset }}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  style={{ filter: "url(#glow)" }}
                />
              </svg>

              <motion.div
                animate={zapControls}
                className="absolute z-10 flex items-center justify-center bg-white rounded-full shadow-xl border-2 cursor-grab active:cursor-grabbing"
                style={{
                  left: zapX,
                  top: zapY,
                  x: '-50%',
                  y: '-50%',
                  width: 44,
                  height: 44,
                  borderColor: getColor(newEnergy)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Zap className="h-6 w-6 fill-current" style={{ color: getColor(newEnergy) }} />
              </motion.div>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  key={newEnergy}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl font-black text-gray-800 tracking-tighter">
                    {newEnergy}<span className="text-xl opacity-30">%</span>
                  </span>
                  <span
                    className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full mt-1 bg-white shadow-sm border"
                    style={{ color: getColor(newEnergy), borderColor: `${getColor(newEnergy)}44` }}
                  >
                    {newEnergy > 80 ? 'Max Power' : 'Syncing'}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
              <div className="min-h-[60px] flex items-center">
                <motion.p
                  key={getEnergyMessage(newEnergy)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-lg font-medium text-gray-600 leading-tight"
                >
                  {getEnergyMessage(newEnergy)}
                </motion.p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isLoading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-gray-200 hover:shadow-xl hover:bg-primaryHover transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Calibrating...</span>
                  </div>
                ) : (
                  'Save Energy Level'
                )}
              </motion.button>
            </div>
          </div>
        </ModalPopup>
      )}
    </div>
  );
};

export default EnergyLevel;
