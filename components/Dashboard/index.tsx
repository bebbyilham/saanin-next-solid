"use client";
import React from "react";
import IKMCard from "./IKMCard";
import BudgetCard from "./BudgetCard";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <section className="pb-10 lg:pb-15 xl:pb-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <motion.div
           variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-7.5 lg:grid-cols-2 xl:gap-12.5"
        >
          <div className="animate_top">
            <IKMCard />
          </div>
          <div className="animate_top">
            <BudgetCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Dashboard;
