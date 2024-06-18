import React, { ReactNode, useState } from "react";
import { Alert, Modal, TouchableOpacity, View } from "react-native";

type Props = {};

const ModalPopup = ({
  children,
  modalVisible,
  setModalVisible,
  hideModal,
}: {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: any;
  hideModal: any;
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
      <TouchableOpacity
        className="flex-1"
        onPress={() => hideModal()}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalPopup;
