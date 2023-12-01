import React from "react";

const AudioCallModal = () => {
  return (
    <>
      <div
        className="modal fade"
        id="audiocallModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <div class="text-center p-4">
                <div class="avatar-lg mx-auto mb-4">
                  <img
                    src="assets/images/users/avatar-4.jpg"
                    alt="ok"
                    class="img-thumbnail rounded-circle"
                  />
                </div>

                <h5 class="text-truncate">Doris Brown</h5>
                <p class="text-muted">Start Audio Call</p>

                <div class="mt-5">
                  <ul class="list-inline mb-1">
                    <li class="list-inline-item px-2 me-2 ms-0">
                      <button
                        type="button"
                        class="btn btn-danger avatar-sm rounded-circle"
                        data-bs-dismiss="modal"
                      >
                        <span class="avatar-title bg-transparent font-size-20">
                          <i class="ri-close-fill"></i>
                        </span>
                      </button>
                    </li>
                    <li class="list-inline-item px-2">
                      <button
                        type="button"
                        class="btn btn-success avatar-sm rounded-circle"
                      >
                        <span class="avatar-title bg-transparent font-size-20">
                          <i class="ri-phone-fill"></i>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioCallModal;
