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
          icon={<PawPrint />}
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
                  stroke={getColor(newActivity)}
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

              {/* Paw icon with wiggle */}
              <motion.div
                animate={pawControls}
                className="absolute -translate-x-1/2 -translate-y-1/2 text-blue-500"
                style={{ left: pawX, top: pawY }}
              >
                <PawPrint className="h-6 w-6" />
              </motion.div>

              {/* Sparkles */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pawX, top: pawY }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
              >
                <Star className="h-3 w-3 text-yellow-400" />
              </motion.div>

              {/* Percentage */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-gray-800"
                key={newActivity}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {newActivity}%
              </motion.div>
            </div>

            {/* Dynamic pet feedback */}
            <motion.p
              key={getActivityMessage(newActivity)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-lg text-gray-700"
            >
              {getActivityMessage(newActivity)}
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

export default ActivityLevel;
