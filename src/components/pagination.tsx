import { Flex, Box, Button, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import React from "react";

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
        icon={<ArrowBackIcon />}
        variant="outline"
        colorScheme="teal"
        size="sm"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      />

      {getPageNumbers().map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={page === pageNumber ? "solid" : "outline"}
          colorScheme="teal"
          size="sm"
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}

      <IconButton
        aria-label="Next page"
        icon={<ArrowForwardIcon />}
        variant="outline"
        colorScheme="teal"
        size="sm"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      />
    </Flex>
  );
};

export default Pagination;
