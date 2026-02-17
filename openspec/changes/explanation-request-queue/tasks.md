## 1. Queue Data Structure

- [ ] 1.1 Create ExplanationRequest interface with code, languageId, and timestamp
- [ ] 1.2 Add queue array and isProcessing flag to module state
- [ ] 1.3 Implement enqueue function to add requests to queue
- [ ] 1.4 Implement dequeue function to get next request from queue

## 2. Request Processor

- [ ] 2.1 Create processQueue async function that runs until queue is empty
- [ ] 2.2 Update processQueue to prevent concurrent execution with isProcessing flag
- [ ] 2.3 Modify explainCodeInMarkdown to accept request object instead of individual params
- [ ] 2.4 Ensure languageId from request object is used throughout processing

## 3. Command Handler Integration

- [ ] 3.1 Update cat.explainCode command to enqueue requests instead of processing directly
- [ ] 3.2 Capture selectedText and languageId at command invocation time
- [ ] 3.3 Call processQueue after enqueuing to start processing if not already running
- [ ] 3.4 Remove old direct processing code from command handler

## 4. Progress Notification

- [ ] 4.1 Update progress notification to show "Generating explanation X/Y..." format
- [ ] 4.2 Calculate current position and total from queue state
- [ ] 4.3 Update notification message as each request completes
- [ ] 4.4 Clear notification when queue is empty

## 5. Testing & Validation

- [ ] 5.1 Test with rapid-fire requests (5+ in quick succession)
- [ ] 5.2 Test with mixed language requests (Python, TypeScript, JavaScript)
- [ ] 5.3 Verify all requests complete without drops
- [ ] 5.4 Verify correct language applied to each slide
- [ ] 5.5 Test UI remains responsive during queue processing
