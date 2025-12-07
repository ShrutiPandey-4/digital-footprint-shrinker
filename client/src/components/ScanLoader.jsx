import { motion } from "framer-motion";

export default function ScanLoader() {
  return (
    <div className="flex flex-col items-center mt-8">
      <motion.div
        className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-gray-600 mt-3 text-lg">Scanning your digital footprint...</p>
    </div>
  );
}
