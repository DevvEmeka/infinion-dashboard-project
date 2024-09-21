import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';
import './Campaign.scss'

const Campaign = ({ setCurrentPage, totalPages }) => {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected); // Set current page based on selected page from pagination
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 200 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.9 },
    },
  };

  return (
    <motion.section variants={paginationVariants} initial="hidden" animate="visible">
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span>
            <BsChevronRight className="icon-rt" />
          </span>
        }
        onPageChange={handlePageClick} // Trigger page change
        pageRangeDisplayed={6}
        pageCount={totalPages} // Total pages from the API
        previousLabel={
          <span>
            <BsChevronLeft className="icon-lf" />
          </span>
        }
        containerClassName="container-style"
      />
    </motion.section>
  );
};

export default Campaign;
