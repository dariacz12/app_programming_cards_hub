import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface BarProps {
  completedQuestions: number;
  allQuestions: number;
}
const ProgressBar = ({ completedQuestions, allQuestions }: BarProps) => {
  const [donePercent, setDonePercent] = useState<number>(0);
  useEffect(() => {
    if (completedQuestions) {
      setDonePercent((completedQuestions * 100) / allQuestions);
    }
  }, [completedQuestions]);
  return (
    <View className="flex-1 justify-center items-center px-8 pb-4 ">
      <View className="h-1 w-full  bg-block rounded-3xl">
        <View
          style={{ width: `${donePercent}%` }}
          className={`h-1  bg-activeColor rounded-3xl shadow-sm shadow-activeColor `}
        ></View>
      </View>
    </View>
  );
};

export default ProgressBar;
