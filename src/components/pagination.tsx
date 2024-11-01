import { Flex, Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Flex justify="center" gap={4} marginY={4}>
      <IconButton
        aria-label="Previous page"
        variant="outline"
        colorScheme="green"
        size={{ smDown: 'xs', sm: 'sm' }}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <HiArrowLeft />
      </IconButton>

      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={page === pageNumber ? "solid" : "outline"}
          colorScheme="green"
          size={{ smDown: 'xs', sm: 'sm' }}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      <IconButton
        aria-label="Next page"
        variant="outline"
        colorScheme="green"
        size={{ smDown: 'xs', sm: 'sm' }}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === 1}
      >
        <HiArrowRight />
      </IconButton>
    </Flex>
  );
};

export default Pagination;
