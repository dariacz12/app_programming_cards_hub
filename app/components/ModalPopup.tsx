import React, { ReactNode, useState } from "react";
import { Alert, Modal, View } from "react-native";

type Props = {};

const ModalPopup = ({
  children,
  modalVisible,
  setModalVisible,
}: {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: any;
}) => {
  return (
    <Modal
      // className='flex-1 h-68  mx-5 mt-6 mb-5 py-7 pt-7   border border-borderColorSemiTransparent rounded-3x'
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalPopup;
