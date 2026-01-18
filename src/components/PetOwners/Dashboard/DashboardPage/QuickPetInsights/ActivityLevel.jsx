import ModalPopup from '@/components/Common/ModalPopup/ModalPopup';
import { PawPrint, Star } from 'lucide-react';
import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useAddActivityLevelMutation } from '@/redux/services/petApi';
import { toast } from 'react-toastify';

const ActivityLevel = ({ petId, activityLevel }) => {
  let latestActivityLevel = 0;
  if (activityLevel.length > 0) {
    latestActivityLevel = activityLevel.reduce(
      (latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest
    ).value || 0;
  }

  const [showLogModal, setShowLogModal] = useState(false);
  const [newActivity, setNewActivity] = useState(latestActivityLevel);

  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const getActivityMessage = (value) => {
    if (value >= 80) return 'Woof-tastic! Your pet is super active!';
    if (value >= 50) return 'Healthy paws – activity is normal.';
    if (value >= 30) return 'Taking it easy – could use more playtime.';
    return 'Low energy – might need love or a vet check.';
  };

  const getColor = (value) => {
    if (value >= 80) return '#16a34a'; // green
    if (value >= 50) return '#3b82f6'; // blue
    if (value >= 30) return '#facc15'; // yellow
    return '#f87171'; // red
  };

  const circleRef = useRef(null);
  const pawControls = useAnimation();

  const handlePointerMove = (e) => {
    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - radius;
    const y = e.clientY - rect.top - radius;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    if (angle > 100 * 3.6) angle = 100 * 3.6;
    const newVal = Math.round(angle / 3.6);
    setNewActivity(newVal);

    // Paw wiggle
    pawControls.start({
      rotate: [0, -20, 20, -10, 10, 0],
      transition: { duration: 0.5, ease: 'easeInOut' },
    });
  };

  const [addActivityLevel, { isLoading }] = useAddActivityLevelMutation();
  const handleSave = async () => {
    try {
      const res = await addActivityLevel({
        id: petId,
        activity_level: newActivity
      }).unwrap();
      toast.success("Activity level logged successfully!", { autoClose: 2000 })
    } catch (error) {
      console.log(error)
      toast.error("Failed to log activity level!", { autoClose: 2000 })
    } finally {
      setShowLogModal(false);
    }
  };

  const strokeDashoffset = circumference - (newActivity / 100) * circumference;

  const angle = (newActivity / 100) * 360 - 90;
  const pawX = radius + normalizedRadius * Math.cos((angle * Math.PI) / 180);
  const pawY = radius + normalizedRadius * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-gray-600">Activity Level</h3>
        <PawPrint className="h-4 w-4 text-blue-500" />
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-bold">{latestActivityLevel}%</div>
        <button
          onClick={() => setShowLogModal(true)}
          className="w-20 text-sm border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
        >
          Log new
        </button>
      </div>

      <div className="mt-2 h-2 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${latestActivityLevel}%` }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-full"
          style={{ background: getColor(latestActivityLevel) }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-2">
        {getActivityMessage(latestActivityLevel)}
      </p>

      {showLogModal && (
        <ModalPopup
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          title="Log Activity Level"
          icon={<PawPrint className="animate-pulse" />}
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
                  stroke={getColor(newActivity)}
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
                animate={pawControls}
                className="absolute z-10 flex items-center justify-center bg-white rounded-full shadow-xl border-2 cursor-grab active:cursor-grabbing"
                style={{
                  left: pawX,
                  top: pawY,
                  x: '-50%',
                  y: '-50%',
                  width: 44,
                  height: 44,
                  borderColor: getColor(newActivity)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PawPrint className="h-6 w-6 fill-current" style={{ color: getColor(newActivity) }} />
              </motion.div>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  key={newActivity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-5xl font-black text-gray-800 tracking-tighter">
                    {newActivity}<span className="text-xl opacity-30">%</span>
                  </span>
                  <span
                    className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full mt-1 bg-white shadow-sm border"
                    style={{ color: getColor(newActivity), borderColor: `${getColor(newActivity)}44` }}
                  >
                    {newActivity > 80 ? 'Max Power' : 'Syncing'}
                  </span>
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full max-w-xs text-center">
              <div className="min-h-[60px] flex items-center">
                <motion.p
                  key={getActivityMessage(newActivity)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-lg font-medium text-gray-600 leading-tight"
                >
                  {getActivityMessage(newActivity)}
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
                  'Save Activity Level'
                )}
              </motion.button>
            </div>
          </div>
        </ModalPopup>
      )}
    </div>
  );
};

export default ActivityLevel;
