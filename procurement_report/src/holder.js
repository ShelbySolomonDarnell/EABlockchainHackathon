{page === pages.length - 1 ? (
                  <div className="flex w-full justify-center py-6 text-lg  absolute bottom-0">
                    <button
                      className="mr-2 px-4 py-1 rounded-md text-jungle outline-none"
                      onClick={previousPage}
                    >
                      Go Back
                    </button>
                    <button
                      type="submit"
                      className="bg-primary px-4 py-1 rounded-md text-white outline-none"
                    >
                      Verify Business
                    </button>
                  </div>
                ) : (
                  <div className="flex w-full justify-center py-6 text-lg  absolute bottom-0 outline-none">
                    {page + 1 === 1 ? (
                      <button
                        className="bg-primary px-4 py-1 rounded-md text-white"
                        onClick={nextPage}
                      >
                        Continue
                      </button>
                    ) : (
                      <div className="flex w-full justify-center py-6 text-lg  absolute bottom-0">
                        <button
                          className="mr-2 px-4 py-1 rounded-md text-jungle outline-none"
                          onClick={previousPage}
                        >
                          Go Back
                        </button>
                        <button
                          className="bg-primary px-4 py-1 rounded-md text-white outline-none"
                          onClick={nextPage}
                        >
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                )}