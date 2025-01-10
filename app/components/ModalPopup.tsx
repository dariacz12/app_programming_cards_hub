import React, { ReactNode } from "react";
import { Alert, Modal, TouchableOpacity} from "react-native";

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
