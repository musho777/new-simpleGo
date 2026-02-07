import offerIcon from 'assets/customerManagement/offer.svg';
import statusIcon from 'assets/customerManagement/status.svg';
import Modal from 'common-ui/modal';
import Tag from 'pages/components/tag';
import PropTypes from 'prop-types';

import {
  Icon,
  ModalContent,
  OfferField,
  OfferHeader,
  OfferInfoModalStyles,
  OfferValue,
} from './OfferInfoModal.styles';

const OfferInfoModal = ({ isOpen, onClose, offerDetails }) => {
  return (
    <>
      <OfferInfoModalStyles />
      <Modal
        className={'offer-info-modal'}
        isOpen={isOpen}
        onClose={onClose}
        closeIcon
        title="Offer Information"
      >
        <ModalContent>
          <OfferHeader>
            <div>
              <Icon src={offerIcon} alt="offer-icon" />
              <p>Offer</p>
            </div>
            <div>
              <Icon src={statusIcon} alt="status-icon" />
              <p>Status</p>
            </div>
          </OfferHeader>
          {offerDetails?.map((offer, index) => {
            return (
              <OfferField key={index}>
                <OfferValue>{offer.name}</OfferValue>
                <Tag type="statuses" variant={offer.status} />
              </OfferField>
            );
          })}
        </ModalContent>
      </Modal>
    </>
  );
};

OfferInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  offerDetails: PropTypes.shape({
    name: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default OfferInfoModal;
