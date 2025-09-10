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
          icon={<Zap />}
        >
          <div className="flex flex-col items-center gap-6 p-4">
            {/* Circular slider */}
            <div
              ref={circleRef}
              className="relative w-[180px] h-[180px]"
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
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="#e5e7eb"
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
                  strokeDashoffset={strokeDashoffset}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.3 }}
                />
              </svg>

              {/* Zap icon with wiggle */}
              <motion.div
                animate={zapControls}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-yellow-500"
                style={{ left: zapX, top: zapY }}
              >
                <Zap className="h-6 w-6" />
              </motion.div>

              {/* Spark effect */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: zapX, top: zapY }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              >
                <Star className="h-3 w-3 text-yellow-400" />
              </motion.div>

              {/* Percentage */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800"
                key={newEnergy}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {newEnergy}%
              </motion.div>
            </div>

            {/* Dynamic pet feedback */}
            <motion.p
              key={getEnergyMessage(newEnergy)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-lg text-gray-700"
            >
              {getEnergyMessage(newEnergy)}
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded-full shadow-md hover:bg-primaryHover transition-all max-sm:w-full"
            >
              {isLoading ? 'Loading...' : 'Save'}
            </motion.button>
          </div>
        </ModalPopup>
      )}
    </div>
  );
};

export default EnergyLevel;
